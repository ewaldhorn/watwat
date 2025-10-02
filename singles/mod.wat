;; basic mod function
(module
  (func $mod (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.rem_s
  )

  (export "mod" (func $mod))
)
