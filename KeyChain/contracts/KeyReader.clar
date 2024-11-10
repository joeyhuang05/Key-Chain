(define-data-var connections (list 100 principal) (list))
(define-data-var bigKey principal 'SP000000000000000000002Q6VF78)
(define-data-var userkey principal 'SP000000000000000000002Q6VF78)

(define-public (addKey (keyid principal))
    (let 
        ((connects (var-get connections))
         (index (index-of? connects keyid)))
    
    (if (is-none index) ;; Match the list length limit
        (ok (var-set connections (unwrap! (as-max-len? (append connects keyid) u100) (err u1))))
        (err u1)
    )
))

(define-public (removeKey (keyid principal))
    (let 
        (
            (connects (var-get connections))
        )

        (begin
            (asserts! (is-ok (principal-destruct? keyid)) (err u1))
            (var-set bigKey keyid)
            (var-set connections (filter isIn connects))
            (ok true)
        )
        ;;ok (concat (slice? connects u0 (unwrap! index u1)) (slice? connects (unwrap! index u0) (+ u1 (len connects)))))
))

(define-private (isIn (id principal))
    (not (is-eq id (var-get bigKey)))
)


(define-public (key_matches (user principal))
    (let (
        (user-key-chain (unwrap! (contract-call? .KeyIssuance2 get-user-map user) (err u1)))
    )
    (ok (len (filter filterl1 user-key-chain)))
    )
)

(define-private (filterl1 (user principal))
    (begin
        (var-set userkey user)
        (if 
            (is-eq u1 (len (filter filterl2 (var-get connections))))
            true
            false
        )
    )
)

(define-private (filterl2 (business principal))
    (is-eq (var-get userkey) business)
)
