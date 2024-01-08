console.log('client.js is sourced!');

function fetchCalculations() { 

    axios({
        method: 'GET',
        url: '/calculations',
      })
    .then(function (response) {
      console.log('GET Response:', response.data);
      render(response.data);
    })
    .catch(function (error) {
      console.error('GET Error:', error.message);
    });
}

fetchCalculations();

function render(calculationList) {
    const calculationListElement = document.querySelector('#resultHistory');
    for (let calculation of calculationList) {
      calculationListElement.innerHTML += `
      <li>
        ${calculation.numOne} ${calculation.operator} ${calculation.numTwo}
        = ${calculation.result}
      </li>
      `;
    }   
}

function submitNumbers(event) {
    event.preventDefault();
    const numOneElement = document.querySelector('#numOne');
    const numTwoElement = document.querySelector('#numTwo');

  
    const newCalculation = {
      numOne: numOneElement.value,
      numTwo: numTwoElement.value,
    };

  axios({
    method: 'POST',
    url: '/calculations',
    data: newCalculation,
  })
    .then((response) => {
      numOneElement.value = '';
      numTwoElement.value = '';

      const calculationListElement = document.querySelector('#resultHistory');
      calculationListElement.innerHTML = '';

      fetchCalculations();

      return 
      
    })
    .catch((error) => {
      console.error('ERROR:', error);
    });
}