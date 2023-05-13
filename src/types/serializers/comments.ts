export interface CommentReadSerializer {
  created_date: string;
  creator: {
    account_number: string;
    balance: number;
    display_image: string;
    display_name: string;
  };
  id: number;
  modified_date: string;
  recipe: number;
  text: string;
}
