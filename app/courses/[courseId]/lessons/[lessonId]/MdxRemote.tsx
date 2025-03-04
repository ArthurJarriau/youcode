import { MDXRemote } from 'next-mdx-remote/rsc'

export type MdxRemoteProps = {
    markdown: string
}

export const MdxRemote = (props: MdxRemoteProps) => {
  return (
    <div className='prose dark:prose-invert xl:prose-xl'>
       
        <MDXRemote
    source={props.markdown}
  />
    </div>
  )
}
