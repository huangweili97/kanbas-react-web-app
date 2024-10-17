export default function FindIndex() {
    // 普通 JavaScript 代码放在这里
    let numberArray1 = [1, 2, 4, 5, 6];
    let stringArray1 = ['string1', 'string3'];

    const fourIndex = numberArray1.findIndex(a => a === 4);
    const string3Index = stringArray1.findIndex(a => a === 'string3');

    // JSX 结构放在 return 中
    return (
        <div>
            <h4>Find Index Example</h4>
            <p>Index of 4 in numberArray1: {fourIndex}</p>
            <p>Index of 'string3' in stringArray1: {string3Index}</p>
        </div>
    );
}


