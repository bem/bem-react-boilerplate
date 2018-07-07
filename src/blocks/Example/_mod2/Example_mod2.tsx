import Example from '../Example';

export interface IExampleMod2Props {
  mod2?: boolean;
}

export default class ExampleMod2 extends Example<IExampleMod2Props> {
  public static mod = ({ mod2 }: IExampleMod2Props) => mod2 === true;

  public content() {
    return super.content() + ' with mod2';
  }
};
