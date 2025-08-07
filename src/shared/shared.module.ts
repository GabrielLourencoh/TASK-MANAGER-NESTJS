import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/shared/infra/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class SharedModule {}
