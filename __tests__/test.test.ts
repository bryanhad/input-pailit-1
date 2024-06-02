function add(a:number,b:number) {
    return a+b
}

describe('A test to use ts-jest', () => {
    it('outputs the sum', () => {
        expect(add(4,5)).toEqual(9)
    })
    
})