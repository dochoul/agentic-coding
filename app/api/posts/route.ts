import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/posts?userId=1 - 특정 사용자의 게시글 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId 파라미터가 필요합니다.' },
        { status: 400 }
      );
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: parseInt(userId),
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('게시글 조회 오류:', error);
    return NextResponse.json(
      { error: '게시글을 불러올 수 없습니다.' },
      { status: 500 }
    );
  }
}

// POST /api/posts - 새 게시글 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, body: content, userId } = body;

    if (!title || !content || !userId) {
      return NextResponse.json(
        { error: '제목, 내용, 사용자 ID는 필수입니다.' },
        { status: 400 }
      );
    }

    // 사용자 존재 확인
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { error: '존재하지 않는 사용자입니다.' },
        { status: 404 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        body: content,
        userId: parseInt(userId),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('게시글 생성 오류:', error);
    return NextResponse.json(
      { error: '게시글을 생성할 수 없습니다.' },
      { status: 500 }
    );
  }
}
