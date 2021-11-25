import { ProyectoModule } from './proyecto.module';

describe('DashboardModule', () => {
  let proyectoModule: ProyectoModule;

  beforeEach(() => {
    proyectoModule = new ProyectoModule();
  });

  it('should create an instance', () => {
    expect(proyectoModule).toBeTruthy();
  });
});
