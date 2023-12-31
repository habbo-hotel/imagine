import {UserService} from '../user/user.service';
import {Mutation, Resolver} from '@nestjs/graphql';
import {GetIpAddress} from '../utility/get-ip-address';
import {SessionService} from '../session/session.service';
import {UserRepository} from '../database/user.repository';
import {SessionCreatedModel} from '../session/session.model';

@Resolver(() => SessionCreatedModel)
export class TempUserResolver {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userService: UserService,
    private readonly sessionService: SessionService
  ) {}

  @Mutation(() => SessionCreatedModel)
  async tempUserLogin(
    @GetIpAddress() ipAddress: string
  ): Promise<SessionCreatedModel> {
    const matchingUser = await this.userRepo.findOne({
      where: {
        ipLast: ipAddress,
        ipRegistered: ipAddress,
        tempUser: 1,
      },
    });

    if (!matchingUser) {
      const newUser = await this.userService.createQuickUser(ipAddress, {
        tempUser: 1,
      });
      const newSession = await this.sessionService.generateSession(newUser.id!);
      return {
        id: newSession.session.id!,
        userID: newUser.id!,
        accessToken: newSession.accessToken,
      };
    }
    const newSession = await this.sessionService.generateSession(
      matchingUser.id!
    );
    return {
      id: newSession.session.id!,
      userID: matchingUser.id!,
      accessToken: newSession.accessToken,
    };
  }
}
