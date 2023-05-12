export interface RecipeReadSerializer {
  created_date: string;
  creator: {
    account_number: string;
    balance: number;
    display_image: string;
    display_name: string;
  };
  description: string;
  id: number;
  image_url: string;
  modified_date: string;
  name: string;
}
