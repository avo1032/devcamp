import { User } from "src/user/entity/uesr.entity";

export const SignResponse = {
  status: 201,
  description: '응답성공',
  schema: {
    example: {
      success: true,
      data: {
        user: {
          id: '1a554b0cd724d4793b08bc15fe955c690',
          name: '유승완',
          email: 'test@test.com',
        },
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  },
};


export type SignResponseDto = {
  user: User;
  accessToken: string;
  refreshToken: string;
}
