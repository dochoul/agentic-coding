import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/users - 사용자 목록 조회
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '사용자 목록을 불러올 수 없습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/users - 새 사용자 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      username,
      email,
      age,
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

    // 필수 필드 검증
    if (!name || !username || !email) {
      return NextResponse.json(
        { error: '이름, 사용자명, 이메일은 필수입니다.' },
        { status: 400 }
      );
    }

    // 중복 확인
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 사용자명 또는 이메일입니다.' },
        { status: 409 }
      );
    }

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        age,
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

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('사용자 생성 오류:', error);
    return NextResponse.json(
      { error: '사용자를 생성할 수 없습니다.' },
      { status: 500 }
    );
  }
}
