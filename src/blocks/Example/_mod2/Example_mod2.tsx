import Example from '../Example';

export interface IExampleMod2Props {
  mod2?: boolean;
}

export default () => class ExampleMod2 extends Example<IExampleMod2Props> {
  public static mod = { mod2: true };

  protected content() {
    return super.content() + ' with mod2';
  }
};
