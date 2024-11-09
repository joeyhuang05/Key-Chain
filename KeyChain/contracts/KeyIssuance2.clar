(define-non-fungible-token keys uint)

(define-data-var nfts-minted uint u0)
(define-data-var live-keys  (list 50 uint) (list u0))
(define-map key-data uint (tuple (business principal) (time uint)))

(define-public (issue-key (user principal))
    (let (
        (current-time stacks-block-height)
        (token-id (var-get nfts-minted))
    )
        (begin
<<<<<<< HEAD
            (try! (nft-mint? keys (var-get nfts-minted) user))
            (var-set nfts-minted (+ (var-get nfts-minted) u1))
            (ok (var-get nfts-minted))
=======
            (try! (nft-mint? keys token-id user))
            (map-insert key-data (tuple (business contract-owner) (check-in-time stacks-block-height)))
            (var-set token-id (+ token-id u1))
            (ok token-id)
>>>>>>> 4aa8343c0d2d5677340f52fc8f68ba3a5a925cdc
        )
    ))

(define-read-only (get-key-details (key-id uint))
    (ok (map-get? key-data key-id))
)