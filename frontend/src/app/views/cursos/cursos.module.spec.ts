import { CursosModule } from './cursos.module';

describe('DashboardModule', () => {
  let cursosModule: CursosModule;

  beforeEach(() => {
    cursosModule = new CursosModule();
  });

  it('should create an instance', () => {
    expect(cursosModule).toBeTruthy();
  });
});
