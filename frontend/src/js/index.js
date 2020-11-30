import { Initializer } from './utils/initializer';

const initializer = new Initializer();

function detectMobile() {
    return (( window.innerWidth <= 600 ) && ( window.innerHeight <= 800 ));
  }

window.onload = async () => {
    await initializer.getConfig();

    if (detectMobile()) {
        document.getElementById('mobile').classList.toggle('no-display');

        
        document.getElementById('mobile-code-button').onclick = () => {
            const value = document.getElementById('mobile-code-input').value;

            if (value && value.length === 6) {
                initializer.connectMobile(value);
            }
        }
    } else {
        document.getElementById('desktop').classList.toggle('no-display');
        await initializer.loadRooms();
        initializer.showCurrentPlayersOnline();
    }
};
