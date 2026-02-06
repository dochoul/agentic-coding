import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/users/[id] - 특정 사용자 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('사용자 조회 오류:', error);
    return NextResponse.json({ error: '사용자를 불러올 수 없습니다.' }, { status: 500 });
  }
}

// PUT /api/users/[id] - 사용자 정보 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      username,
      email,
      phone,
      website,
      street,
      suite,
      city,
      zipcode,
      companyName,
      companyCatchPhrase,
      companyBs,
    } = body;

    // 사용자 존재 확인
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    // username이나 email이 변경되는 경우 중복 확인
    if (username !== existingUser.username || email !== existingUser.email) {
      const duplicate = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [{ username }, { email }],
            },
          ],
        },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: '이미 존재하는 사용자명 또는 이메일입니다.' },
          { status: 409 }
        );
      }
    }

    // 사용자 정보 업데이트
    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        username,
        email,
        phone,
        website,
        street,
        suite,
        city,
        zipcode,
        companyName,
        companyCatchPhrase,
        companyBs,
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('사용자 수정 오류:', error);
    return NextResponse.json({ error: '사용자를 수정할 수 없습니다.' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - 사용자 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    // 사용자 존재 확인
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 사용자 삭제 (Cascade로 게시글도 자동 삭제됨)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    return NextResponse.json({ error: '사용자를 삭제할 수 없습니다.' }, { status: 500 });
  }
}
