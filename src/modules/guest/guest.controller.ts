import { Controller, Get, Post, Body, Query, Param } from "@nestjs/common";
import { GuestService } from './guest.service';
// import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { BaseController } from '../../common/shared/base-controller';

@Controller('guest')
export class GuestController extends BaseController {
  constructor(private readonly guestService: GuestService) {
    super();
  }

  @Post('/update-presence')
  updatePresence(@Body() updateGuestDto: UpdateGuestDto) {
    return this.run(async () => {
      return this.guestService.updatePresence(updateGuestDto);
    });
  }

  @Get('all')
  findAll() {
    return this.run(async () => {
      return this.guestService.findAll();
    });
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.run(async () => {
      return this.guestService.findOne(id);
    });
  }

  @Get('search')
  search(@Query() { search }: { search: string }) {
    return this.run(async () => {
      return this.guestService.findGuestBy(search);
    });
  }
}
