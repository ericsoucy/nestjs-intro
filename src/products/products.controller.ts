import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  addProduct(
    @Body() requestBody: { title: string; description: string; price: number },
  ): any {
    const generatedId = this.productsService.insertProduct(
      requestBody.title,
      requestBody.description,
      requestBody.price,
    );
    return { id: generatedId };
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(
      productId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
    return null;
  }
}
