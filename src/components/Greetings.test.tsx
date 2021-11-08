import {render, screen} from '@testing-library/react';
import { Greetings } from './Greetings';
import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';

describe('when rendered with a `name` prop', () => {
    it('should paste it into the greeting text', () => {
        render(<Greetings name="Burhan" />);

        expect(
            screen.getByText(/Hello Burhan/)
        ).toBeInTheDocument()
    })
})

describe("when rendered with `onSendWaves` prop", () => {
    it("should render the sending waves button", () => {
      render(
        <Greetings 
          name="Test Name" 
          onSendWaves={() => {}} />
         );
      
      expect(
        screen.getByRole("button")
      ).toBeInTheDocument();
    });
  });

  describe("when the button is pressed", () => {
    it("should call the `onSendWaves` callback", () => {
      const onSendWavesMock = jest.fn();
      render(
        <Greetings 
          name="Test Name" 
          onSendWaves={onSendWavesMock} />
      );
      
      fireEvent.click(screen.getByRole("button"));
      expect(onSendWavesMock).toHaveBeenCalledWith(
        "Waves sent to Test Name!");
    });
  });