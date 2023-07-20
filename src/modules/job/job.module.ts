import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankController } from './job.controller';
import { BankService } from './job.service';
import { Bank, BankSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Bank.name,
        schema: BankSchema,
      },
    ]),
  ],
  controllers: [BankController],
  providers: [BankService],
})
export class BankModule implements OnModuleInit {
  constructor(private service: BankService) {}
  async onModuleInit() {
    const countItem = await this.service.count();
    if (countItem == 0) {
      await this.service.insertMany([
        {
          name: 'Ngân hàng ngoại thương Việt Nam(VietcomBank)',
        },
        {
          name: 'Ngân hàng Đầu tư và Phát triển VN (BIDV)',
        },
        {
          name: 'NH Chính sách xã hội (VBSP)',
        },
        {
          name: 'NH Công thương VN (Vietinbank)',
        },
        {
          name: 'NH Nông nghiệp&PT Nông thôn VN-AGribank',
        },
        {
          name: 'NH Phát triển Nhà ĐBSCL (MHB)',
        },
        {
          name: 'NH Phát triển Việt Nam (VDB)',
        },
        {
          name: 'Ngân hàng TMCP Bản Việt',
        },
        {
          name: 'Ngân hàng TMCP Đại A',
        },
        {
          name: 'Ngân hàng TMCP Phát triển MeKong',
        },
        {
          name: 'Ngân hàng TMCP Quốc Dân ',
        },
        {
          name: 'Ngân hàng TMCP Việt Á',
        },
        {
          name: 'Ngân hàng TMCP Việt Nam Thương Tín',
        },
        {
          name: 'Ngân hàng TMCP Xây dựng VN',
        },
        {
          name: 'NH BẢO VIỆT (Bao Viet Bank)',
        },
        {
          name: 'NHTMCP Kỹ thương VN (Techcombank)',
        },
        {
          name: 'NHTMCP Nam Á (Nam A Bank)',
        },
        {
          name: 'NHTMCP phát triển Tp HCM (HD Bank)',
        },
        {
          name: 'NHTMCP Phương Đông (OCB)',
        },
        {
          name: 'NHTMCP Phương Nam (Southern Bank)',
        },
        {
          name: 'NHTMCP Quân Đội (MB)',
        },
        {
          name: 'NHTMCP Quốc Tế (VIB)',
        },
        {
          name: 'NHTMCP Sài Gòn (SCB)',
        },
        {
          name: 'NHTMCP Sài gòn – Hà Nội (SHB)',
        },
        {
          name: 'NHTMCP Sài gòn Thương Tín (Sacombank)',
        },
        {
          name: 'NHTMCP SG Công Thương (SaigonBank)',
        },
        {
          name: 'NHTMCP Việt Hóa (Viet hoa JS bank)',
        },
        {
          name: 'NHTMCP VN Thịnh Vượng (VP Bank)',
        },
        {
          name: 'NHTMCP Xăng dầu Petrolimex (PGBank)',
        },
        {
          name: 'NHTMCP Xuất Nhập Khẩu (Eximbank)',
        },
        {
          name: 'PV com bank_NH Đại Chúng (P.Tay+TCDK)',
        },
        {
          name: 'NH Tiên Phong (Tiên Phong Bank)',
        },
        {
          name: 'NH TMCP BƯU ĐIỆN LIÊN VIỆT',
        },
        {
          name: 'NHTMCP Á Châu (ACB)',
        },
        {
          name: 'NHTMCP An Bình (ABBank)',
        },
        {
          name: 'NHTMCP Bắc Á (Bac A bank)',
        },
        {
          name: 'NHTMCP Đại Dương (Oceanbank)',
        },
        {
          name: 'NHTMCP Dầu khí Toàn cầu (GPBank)',
        },
        {
          name: 'NHTMCP Đông Á (Dong A bank)',
        },
        {
          name: 'NHTMCP Đông Nam Á (Seabank)',
        },
        {
          name: 'NHTMCP Hàng Hải (Maritime Bank)',
        },
        {
          name: 'NHTMCP Kiên Long (Kien Long bank)',
        },
      ]);
    }
  }
}
