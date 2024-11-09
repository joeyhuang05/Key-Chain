
;; title: KeyReader
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;;

;; constants
;;

;; data vars
;;

;; data maps
;;

;; public functions
;;

;; read only functions
;;

;; private functions
;; one function that says set acceptable keys; second function checks how many from that list are in the user's wallet


(define-data-var connections (list 50 principal))

(define-public (add-key (keyid principal))




    (append (connections)

(define-public (acceptable-keys (business principal))
    )