import { useEffect } from 'react'

const useEffectOnce = (effect: any) => {
  useEffect(effect, [])
}

export default useEffectOnce
