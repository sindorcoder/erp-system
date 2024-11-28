import { Spin, Flex } from 'antd';
import { ReactNode, Suspense } from "react"
const Loading = () => {

     return (
          <div className='w-full h-screen flex items-center justify-center'>
            <Flex align="center" gap="middle">
        <Spin tip="Loading..." size="large" />
      </Flex>
          </div>
     )
}

const SuspenseElement = ({children}: {children: ReactNode}) => {
     return ( <Suspense fallback={<Loading/>}> {children}  </Suspense>)
}


const Container = ({children}: {children: ReactNode}) => {
     return <div className='max-w-[1240px] mx-auto px-5'>{children}</div>
}
export { SuspenseElement, Container, Loading }