(define-data-var connections (list 100 principal) (list ))
(define-data-var bigKey uint u0)

(define-private (addKey (keyid principal))
    (let 
        ((connects (var-get connections))
        (index (index-of? connects keyid)))

    (if (is-none index)
        (var-set connections (append connects keyid))
        (ok connects)
    )
))

(define-public (removeKey (keyid principal))
    (let 
        ((connects (var-get connections))
        (index (index-of? connects keyid)))

        (begin
            (var-set bigKey index)
            (var-set connections (filter isIn connects))
        )
        ;;ok (concat (slice? connects u0 (unwrap! index u1)) (slice? connects (unwrap! index u0) (+ u1 (len connects)))))
))

(define-private (isIn (id uint))
    (is-eq id (var-get bigKey)))


;; (define-map connections { keyid: principal } { keydata: principal})
;; 
;; (define-public (addKey (keyid principal)))
;;     )