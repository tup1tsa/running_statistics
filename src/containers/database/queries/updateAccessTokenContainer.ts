import { runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { getConfig } from "../../../application/config";
import { UserInfoHashed } from "../../../application/database/queries/saveNewUser";
import { updateAccessToken } from "../../../application/database/queries/updateAccessToken";

type UpdateAccessTokenContainer = (
  userInfo: UserInfoHashed,
  token: string
) => Promise<UpdateWriteOpResult>;

export const updateAccessTokenContainer: UpdateAccessTokenContainer = async (
  userInfo,
  token
) => runQueryContainer(updateAccessToken(getConfig, userInfo, token));
