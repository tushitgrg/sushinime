'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from 'axios'
import { formatDistance } from 'date-fns'
import LoginBoundary from '../test/login-boundary'




export default function CommentSection({animeid, episodeid}) {
  const [comments, setComments] = useState(null)
  const [newComment, setNewComment] = useState('')
  const getdata = async ()=>{
    const response = await axios.post('/api/comments/get',{animeid,episodeid})
    console.log(response.data)
    setComments(response.data)
  }
  useEffect(()=>{
try{
getdata()
}catch(e){
  console.log(e)
}
  },[])
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    try{
      const newc = await axios.post('/api/comments/post',{animeid, episodeid, text:newComment})
  
      if(newc.data)   setComments((prev)=>[newc.data,...prev])
        setNewComment('')
    }catch(e){
  console.log(e)}
 
    

  }

  return (
    <div className="space-y-8 w-full   p-4 mt-8">
      <h2 className="text-2xl font-bold">Comments</h2>
      <LoginBoundary fallback={'Sign in to comment'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full"
        />
        <Button type="submit">Post Comment</Button>
      </form>
      </LoginBoundary>
      { comments&& comments.length === 0 ? (
        <p className="text-muted-foreground">No comments yet.</p>
      ) : (
        <ul className="space-y-6">
          {comments&& comments.map((comment) => (
            <li key={comment.id} className="flex items-start space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={comment.avatar} alt={comment.name} />
                <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{comment.name}</h3>
                  <span className="text-xs text-muted-foreground">{formatDistance(new Date(), new Date( comment.createdAt), {addSuffix: true} ) }</span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}