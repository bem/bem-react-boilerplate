import Example from '../Example';

export interface IExampleMod1Props {
  mod1?: boolean;
}

export default () => class ExampleMod1 extends Example<IExampleMod1Props> {
  public static mod = ({ mod1 }: IExampleMod1Props) => mod1 === true;

  protected content() {
    return super.content() + ' with mod1';
  }
};
