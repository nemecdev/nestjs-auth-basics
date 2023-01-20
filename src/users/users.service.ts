import { Injectable } from '@nestjs/common'

export type User = {
  id: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'karel',
      password: 'letmein',
    },
    {
      id: 2,
      username: 'pavel',
      password: 'toor',
    },
  ]

  async findOne(username: string): Promise<User | null> {
    return (
      this.users.find((user: User) => {
        return user.username === username
      }) ?? null
    )
  }
}
