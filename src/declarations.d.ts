declare module '*.png' {
    export default value;
}
const value: string;

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '@chakra-ui/react';
