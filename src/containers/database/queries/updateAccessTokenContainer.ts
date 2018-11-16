import { runQueryContainer } from "mongo-wrappers";
import { UpdateWriteOpResult } from "mongodb";
import { appConfig } from "../../../application/config";
import { UserInfo } from "../../../application/database/queries/saveNewUser";
import { updateAccessToken } from "../../../application/database/queries/updateAccessToken";

type UpdateAccessTokenContainer = (
  userInfo: UserInfo,
  token: string
) => Promise<UpdateWriteOpResult>;

export const updateAccessTokenContainer: UpdateAccessTokenContainer = async (
  userInfo,
  token
) => runQueryContainer(updateAccessToken(appConfig, userInfo, token));
