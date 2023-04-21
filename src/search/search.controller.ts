import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { FlavorDto } from './dto/flavor.dto';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  // クエリ両方検索
  @Get()
  getItems(@Query() dto: SearchDto) {
    return this.searchService.searchItems(dto);
  }

  // フレーバー検索
  @Get('/flavor')
  getflavor(@Query() dto: FlavorDto) {
    return this.searchService.searchFlavor(dto);
  }
  // カテゴリ検索
  @Get('/category')
  getCategory(@Query() dto: CategoryDto) {
    return this.searchService.searchCategory(dto);
  }
}
