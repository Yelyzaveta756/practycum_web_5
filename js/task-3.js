// Divisors of natural numbers
const form = document.querySelector('.natural-number-form');
const cookieName = 'divisorsResult';

 if (document.cookie.includes(cookieName)) {
        showCookieDialog();
    } else {
        form.style.display = 'block';
    }

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const numberInput = document.getElementById('natural-number');
    const number = parseInt(numberInput.value.trim());

    if (isNaN(number) || number <= 0) {
        alert('Please enter a valid natural number greater than 0.');
        return;
    }

    const divisors = calculateDivisors(number);

    alert(`Divisors of ${number}: ${divisors.join(', ')}`);

    saveToCookies(number, divisors);

});

// Function to save in cookies
function calculateDivisors(num) {
  const divisors = [];

  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
       if (i !== num / i) {
          divisors.push(num / i);
        }
    }
  }
  return divisors.sort((a, b) => a - b);
}

// Function to display the cookie dialog
 function saveToCookies(number, divisors) {
        const data = {
            number: number,
            divisors: divisors,
            timestamp: new Date().toISOString()
        };
        
        const expires = new Date();
        expires.setDate(expires.getDate() + 1);
        
        document.cookie = `${cookieName}=${JSON.stringify(data)}; expires=${expires.toUTCString()}; path=/`;
    }
    
    // Function to get data from cookies
    function getFromCookies() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(cookieName + '=')) {
                return JSON.parse(cookie.substring(cookieName.length + 1));
            }
        }
        return null;
    }
    
    // Function to delete cookies
    function deleteCookies() {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    
    // Function to display the cookie dialog
    function showCookieDialog() {
        const cookieData = getFromCookies();
        
        if (cookieData) {
            const userChoice = confirm(
                `Saved results found:\n` +
                `Numeric: ${cookieData.number}\n` +
                `Divisors: ${cookieData.divisors.join(', ')}\n` +
                `Calculation date: ${new Date(cookieData.timestamp).toLocaleString()}\n\n` +
                `Do you want to save this data?`
            );
            
            if (userChoice) {
                alert(
                    'Cookie data has been saved. To fully work with the new data, you must reload the web page.'
                );
            } else {
                deleteCookies();
                alert('Cookies have been deleted. The page will be refreshed.');
                location.reload();
            }
        }
    }
