<?php
require_once(__DIR__ . '/./ApiError.php');

class ValidatorChain
{
  private $name;
  private $value;
  private $valueType;

  /**
   * @param string $name
   * @param mixed $value
   * @param 'PURE'|'BODY' $valueType - if the value is validating is
   *  - PURE -> Pure Value
   *  - BODY -> Body Object it's Properties
   * 
   * ```valueType``` is just used for the first moment, to validate if a property in body exists
   * 
   * In case of valueType be ```BODY```, the param ```name``` will be used to identity the property
   */
  public function __construct($name, $value, $valueType = 'PURE')
  {
    $this->value = $value;
    $this->name = $name;
    $this->valueType = $valueType;
  }

  private function throwError($Error, $additionalData = [])
  {
    echo json_encode(array_merge([
      "error" => $Error,
      "field" => $this->name
    ], $additionalData));

    http_response_code(422);

    exit();
  }

  public function exists()
  {
    if ($this->valueType === 'BODY') {
      if (isset($this->value[$this->name])) {
        $this->valueType = 'PURE';
        $this->value = $this->value[$this->name];
        return $this;
      } else {
        $this->throwError(ApiError::$MISSING_FIELD);
      }
    } else {
      if (isset($this->value)) {
        return $this;
      } else {
        $this->throwError(ApiError::$MISSING_FIELD);
      }
    }
  }

  public function isString()
  {
    if (is_string($this->value)) {
      return $this;
    } else {
      $this->throwError(ApiError::$SHOULD_BE_STRING);
    }
  }

  public function stringNotEmpty()
  {
    $this->isString();

    if (trim($this->value) !== "") {
      return $this;
    } else {
      $this->throwError(ApiError::$EMPTY_STRING);
    }
  }

  public function isInt()
  {
    if (is_int($this->value)) {
      return $this;
    } else {
      $this->throwError(ApiError::$SHOULD_BE_NUMBER);
    }
  }

  public function isValidDate()
  {
    $this->isString();

    $dateParts = explode('-', $this->value);

    if (count($dateParts) >= 3) {
      return $this;
    } else {
      $this->throwError(ApiError::$INVALID_DATE);
    }
  }

  public function isArray()
  {
    if (is_array($this->value)) {
      return $this;
    } else {
      $this->throwError(ApiError::$SHOULD_BE_ARRAY);
    }
  }

  public function isDateHigherOrEqualThan($otherDate)
  {
    $this->isValidDate();

    if ($this->value >= $otherDate) {
      return $this;
    } else {
      $this->throwError(ApiError::$INVALID_DATE_RANGE);
    }
  }

  public function isArrayLengthHigher($size)
  {
    $this->isArray();

    if (count($this->value) >= $size) {
      return $this;
    } else {
      $this->throwError(ApiError::$INVALID_DATE);
    }
  }

  public function hasKey($keyName)
  {
    if (array_key_exists($keyName, $this->value)) {
      return $this;
    } else {
      $this->throwError(ApiError::$MISSING_PROPERTY, ['property' => $keyName]);
    }
  }
}
