'use client'

interface Props {
    data: {
        label: string;
        type: 'channel' | 'member';
        data: {
            icon: React.ReactNode;
            name: string;
            id: string;
        }[] | undefined
    }[]
}

const ServerSearch = ({}: Props) => {
    return <div>ServerSearch</div>
};

export default ServerSearch;