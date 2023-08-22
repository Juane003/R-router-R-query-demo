import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProductForCard } from "@/types";

interface ProductCardProps {
  product: ProductForCard;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="w-64 border h-96">
      <CardHeader>
        <CardTitle className="flex items-center">
          <h2 className="text-sm">{product.title}</h2>
          <span className="text-sm text-green-600">${product.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.image} alt="image" className="w-48 h-48" />
      </CardContent>
      <CardFooter>
        <Link to={`/products/${product.id}`}></Link>
      </CardFooter>
    </Card>
  );
};
