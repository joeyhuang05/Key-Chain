(define-data-var connections (list 50 principal) (list ))
;;(define-data-var bigkey uint u0)

(define-public (addKey (keyid principal))
    (let 
        ((connects (var-get connections))
        (index (index-of? connects keyid)))

    (if (is-none index) 
        (append connects keyid) 
        (ok connects)
    )
    (ok connects)
    )
)

(define-public (removeKey (keyid principal))
    (let 
        ((connects (var-get connections))
        (index (index-of? connects keyid)))

    (if (is-none index)
        (ok connects)
        ;;(begin
        ;;(var-set bigkey value)
        ;;(filter (isin _ keyid) connections)
        ;;)
        (ok concat (slice? connects 0 index) (slice? connects index (+ (len connects) 1)))
    )
    (ok connects)
    )
)
;;(define-public (isin (id uint) (keyid uint)) (is-eq id keyid))



;; (match indexof 0 stuff_to_do_if_0 else