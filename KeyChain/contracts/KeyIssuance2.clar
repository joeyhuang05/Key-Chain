(define-non-fungible-token keys uint)

(define-data-var nfts-minted uint u0)
(define-data-var live-keys  (list 50 uint) (list u0))
(define-map key-data uint (tuple (business principal) (time uint)))

(define-public (issue-key (user principal))
    (let (
        (current-time (default-to u0 (get-stacks-block-info? time stacks-block-height)))
        (token-id (var-get nfts-minted))
    )
        (begin
            (try! (nft-mint? keys token-id user))
            (map-insert key-data token-id (tuple (business tx-sender) (time current-time)))
            (var-set nfts-minted (+ token-id u1))
            (ok token-id)
        )
    ))

(define-read-only (get-key-details (key-id uint))
    (ok (map-get? key-data key-id))
)