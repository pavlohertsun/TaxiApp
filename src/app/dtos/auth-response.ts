export interface IAuthResponseDto{
  jwtToken: {
    token: string
  },
  userDto: {
    id: number,
    name: string,
    role: string
  }
}
