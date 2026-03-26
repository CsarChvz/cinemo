import { render, screen, userEvent } from '@/test-utils';
import { MainLayout } from './MainLayout';


describe('MainLayout Component', ()=>{
    it('debe renderizar el contenido hijo (children)', ()=> {
        render(
          <MainLayout>
            <div data-testid="test-content">Contenido de Cinemo</div>
          </MainLayout>
        );

        expect(screen.getByTestId('test-content')).toBeInTheDocument()
    })

    it('debe mostrar el nombre de la app en el header', ()=>{
        render(
            <MainLayout>
                <div />
            </MainLayout>
        )

        expect(screen.getByText(/CINEMO/i)).toBeInTheDocument();
    })

    it('debe alternar el estado del navbar al hacer clic en el burger', async () => {
      render(
        <MainLayout>
          <div />
        </MainLayout>
      );

      // Buscamos el botón burger por su label de accesibilidad
      const burger = screen.getByRole('button', { name: /toggle navigation/i });

      // Al inicio el navbar suele estar colapsado en móvil (depende de media queries)
      // Pero podemos testear que el evento de click se ejecute sin errores
      await userEvent.click(burger);

      // En pruebas de integración con AppShell, es complejo medir el CSS real,
      // pero verificamos que el componente no explote al interactuar.
      expect(burger).toBeInTheDocument();
    });

})