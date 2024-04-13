declare namespace PizzaData {
  type IDType = (import('mongoose').Types.ObjectId | string);

  type ObjectType<Obj> = (Obj | IDType);

  // UTILITY INTERFACES
  type IAddress = {
    street: string;
    city: string;
    state: string;
    zip: string;
  }

  // USER INTERFACES
  type IUser = {
    _id?: IDType;
    name: string;
    email: string;
    number: string | null;
    password: string;
    address: IAddress[] | null;
    birthdate: Date | null;
  }

  type IEmployee = user & {
    address: IAddress[];
    emp_id: string;
    start_date: Date;
    end_date: Date | null;
    hourly_rate: number;
    position: string;
    employeed: boolean;
    clocked_in: boolean;
    on_break: boolean;
  }


  // MENU INTERFACES

  type IDough = {
    _id?: IDType;
    name: string;
    weight: number;
    measurement: string;
  };

  // TOPPINGS
  type IPortion = {
    size: IDType | IDough;
    amount: number;
  };

  type ITopping = {
    _id?: IDType;
    name: string;
    type: string;
    measurement: string;
    price: number;
    amount_per_size: IPortion[]
  };

  // PIZZAS
  type ISection = {
    _id?: IDType;
    name: string;
    pizzas: (IDType | IPizza)[];
  };

  type IPrice = {
    dough: IDType | IDough;
    price: number;
  };

  type IPizza = {
    _id?: IDType;
    name: string;
    section: IDType | ISection;
    toppings: (IDType | ITopping)[];
    prices: IPrice[];
  };
}