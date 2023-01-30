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
    const products = await this.productModel.find(type ? { type } : {}).exec();

    return products.map((product) => {
      return this.entityToDTO(product);
    });
  }

  async findOne(id: string): Promise<ResponseProductDto> {
    const existingProduct = await this.productModel.findById(id).exec();

    if (!existingProduct) {
      this.throwNotFoundException(id);
    }

    return this.entityToDTO(existingProduct);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseProductDto> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto)
      .exec();

    if (!updatedProduct) {
      this.throwNotFoundException(id);
    }

    return this.entityToDTO(updatedProduct);
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const removedProduct = await this.productModel.findByIdAndDelete(id).exec();

    if (!removedProduct) {
      this.throwNotFoundException(id);
    }

    return { deleted: true };
  }

  private throwNotFoundException(id: string) {
    throw new NotFoundException(`Product with id ${id} not found`);
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
