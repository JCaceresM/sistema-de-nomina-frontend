import { Button } from "antd"
import React from "react"
import { useNavigate } from "react-router-dom"

export function HomeRedirect(): JSX.Element {
  const navigate = useNavigate()
  function handleClick() {
    navigate("/")
  }
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Back Home
      </Button>
    </div>
  )
}
