(module
  (func $bytesPerPixel (result i32)
    i32.const 4
  )

  (func (export "bytesRequired") (param $count i32) (result i32)
    call $bytesPerPixel
    local.get $count
    i32.mul
  )
)
