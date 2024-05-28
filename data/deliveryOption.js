import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions =[
    {
        id : '1',
        deliveryDays : 7,
        price : 0
    },
    {
        id : '2',
        deliveryDays : 4,
        price : 150
    },
    {
        id : '3',
        deliveryDays : 1,
        price : 500
    }
];

export function calcDeliveryDate(deliveryOption)
{
    const today = dayjs();
    let optionDate = today.add(deliveryOption.deliveryDays,'days');
    let dateString;

    if(optionDate === 'Saturday')
    {
        optionDate = today.add(deliveryOption.deliveryDays + 2,'days');
    }
    else if(optionDate === 'Sunday'){
        optionDate = today.add(deliveryOption.deliveryDays + 1,'days');
    }
    
    dateString = optionDate.format('dddd, MMMM D');
    return dateString;
}

export function findDeliveryOption(deliveryOptionId)
{
    let matchingDeliveryOption;

    deliveryOptions.forEach((option) =>{
        if(deliveryOptionId === option.id)
        {
            matchingDeliveryOption = option;
        }
    });

    return matchingDeliveryOption;
}

