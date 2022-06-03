const prompt = require('prompt');

async function doTask() {
    const properties = [
        {
          name: 'input',
          validator: /[0-1*]+$/, // regex validation to make sure it only allows 0, 1 or *
          warning: 'The input must be only 0, 1, or *'
        }
    ];
    
    prompt.start();

    prompt.get(properties, function (err, result) {
        if (err) {
            console.log(err);
            return 1;
        }

        let data = permutations(result.input);
        console.log('Output: ' + JSON.stringify(data));
    })

    /**
     * [Returns an array of permutations possible to replace the special character (*) with 0 and 1.]
     * @param  {[string]} input [The string we want to get the permutations]
     * @return {[array]}      [The array of possible permutations]
     */
    function permutations(input)
    {
        // validate if the input contains character special
        if (!input.includes('*')) {
            return [input];
        }

        // initialize variables
        const num = (input.split('*').length - 1) * 2; // Number permutations
        const digits = [0,1]; // Character numbers to replace
        let data = [];
        let temp = [input];

        for(let i = 0; i < num; i++)
        {
            for(let n = 0; n < temp.length; n++)
            {
                //check if the temporary input has a special character to replace
                if(temp[n].includes('*')) {
                    for(let j = 0; j < digits.length; j++)
                    {
                        let newString = temp[n].replace('*', digits[j]);
                        if(!newString.includes('*') && !data.includes(newString)) {
                            data.push(newString);
                        }

                        if(!temp.includes(newString)) {
                            temp.push(newString);
                        }
                    }
                }
            }
        }
        
        return data;
    }
}
  
doTask();