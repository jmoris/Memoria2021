import { UsuarioModule } from './usuarios.module';

describe('DashboardModule', () => {
  let usuarioModule: UsuarioModule;

  beforeEach(() => {
    usuarioModule = new UsuarioModule();
  });

  it('should create an instance', () => {
    expect(usuarioModule).toBeTruthy();
  });
});
