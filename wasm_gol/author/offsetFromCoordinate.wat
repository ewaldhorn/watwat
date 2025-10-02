(func $offsetFromCoordinate (param $x i32) (param $y i32) (result i32)
  get_local $y   ;; push y onto stack
  i32.const 50   ;; push 50 onto stack
  i32.mul        ;; pop two most recent stack values, multiply them, put result on stack
  get_local $x   ;; push x onto stack
  i32.add        ;; add the two most recent numbers on the stack by popping them, adding them up, putting the result on the stack
  i32.const 4    ;; push 4 onto stack
  i32.mul        ;; pop two, multiply, put answer back on stack
)

;; $offsetFromCoordinate ends up with just one value on the stack, that's the return value

(export "offsetFromCoordinate" (func $offsetFromCoordinate)) ;; make function available to the environment


;; The same function can be expressed like this, which might feel more natural to some developers
(func $offsetFromCoordinate (param $x i32) (param $y i32) (result i32)
  (i32.mul
    (i32.add
      (i32.mul
        (i32.const 50)
        (get_local $y)
      )
      (get_local $x)
    )
    (i32.const 4)
  )
)
