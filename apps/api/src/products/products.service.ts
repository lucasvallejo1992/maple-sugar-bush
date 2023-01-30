import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument, Product } from './schema/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseProductDto> {
    const productCreated = await this.productModel.create(createProductDto);

    return this.entityToDTO(productCreated);
  }

  async findAll(type?: string): Promise<ResponseProductDto[]> {
    const products = await this.productModel
      .find(type ? { type, active: true } : { active: true })
      .exec();

    return products.map((product) => {
      return this.entityToDTO(product);
    });
  }

  async findOne(productId: string): Promise<ResponseProductDto> {
    const existingProduct = await await this.findProductById(productId);

    if (!existingProduct) {
      this.throwNotFoundException(productId);
    }

    return this.entityToDTO(existingProduct);
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(productId, updateProductDto)
      .exec();

    if (!updatedProduct) {
      this.throwNotFoundException(productId);
    }

    return this.entityToDTO(updatedProduct);
  }

  async remove(productId: string): Promise<{ deleted: boolean }> {
    const existingProduct = await this.findProductById(productId);

    if (!existingProduct) {
      this.throwNotFoundException(productId);
    }

    existingProduct.active = false;
    existingProduct.save();

    return { deleted: true };
  }

  private throwNotFoundException(productId: string) {
    throw new NotFoundException(`Product with id ${productId} not found`);
  }

  private async findProductById(productId: string) {
    return await this.productModel.findById(productId).exec();
  }

  private entityToDTO(product: Product): ResponseProductDto {
    return {
      id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      stock: product.stock,
      type: product.type,
    };
  }
}
