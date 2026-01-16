export interface UpdateUserDto {
  nickname?: string | undefined;
  image?: string | undefined;
}

export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};
