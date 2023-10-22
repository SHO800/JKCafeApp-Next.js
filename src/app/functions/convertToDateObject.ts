export function convertToDateObject(dateTimeStr: string) {
    // get YY/MM/DD hh/mm/ss
    const dateTimeArr = dateTimeStr.split(" ")
    const date = dateTimeArr[0]
    const time = dateTimeArr[1]

    const year = "20" + date.slice(0, 2);
    const month = date.slice(3, 5);
    const day = date.slice(6, 8);

    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5)
    const second = time.slice(6, 8)

    return new Date(Number(year), Number(month) -1, Number(day), Number(hour), Number(minute), Number(second))
    // return (
    //     {
    //         hour: hour,
    //         minute: minute,
    //         second: second,
    //     }
    // )
}