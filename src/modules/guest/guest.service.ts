import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Guest } from './entities/guest.entity';
import { Model } from 'mongoose';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel(Guest.name)
    private readonly guestModel: Model<Guest>,
  ) {}
  async updatePresence(updateGuestDto: UpdateGuestDto) {
    const guest = await this.guestModel.findOne({
      deleted_at: null,
      _id: updateGuestDto.invite,
    });

    if (!guest) {
      throw new NotFoundException('Invité non trouvé !');
    }

    const mairie = updateGuestDto.items.includes('mairie');
    const eglise = updateGuestDto.items.includes('eglise');
    const reception = updateGuestDto.items.includes('reception');

    const data = Object.assign(updateGuestDto, {
      mairie,
      eglise,
      reception,
    });

    delete data['firstname'];
    delete data['lastname'];

    return this.guestModel.findByIdAndUpdate(guest._id, data, {
      new: true,
      runValidators: true,
    });
  }

  async findGuestBy(search: string) {
    if (!search) {
      return [];
    }

    const guests = await this.guestModel
      .find({
        $or: [
          { firstname: { $regex: new RegExp(search, 'i') } },
          { lastname: { $regex: new RegExp(search, 'i') } },
        ],
      })
      .limit(10);

    const mapData = guests.map((guest) => ({
      label: guest?.firstname + ' ' + (guest.lastname ? guest.lastname : ''),
      value: guest._id.toString(),
    }));

    return mapData;
  }

  findAll() {
    return this.guestModel.find({
      deleted_at: null,
    });
  }
}
